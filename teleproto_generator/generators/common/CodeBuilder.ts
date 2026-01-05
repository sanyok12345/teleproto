export class CodeBuilder {
    private lines: string[] = [];
    private indentLevel = 0;

    indent() {
        this.indentLevel++;
    }

    unindent() {
        if (this.indentLevel > 0) this.indentLevel--;
    }

    write(str: string = "") {
        if (str === "") {
            this.lines.push("");
        } else {
            this.lines.push("    ".repeat(this.indentLevel) + str);
        }
    }

    block(start: string, callback: () => void, end: string = "}") {
        this.write(start);
        this.indent();
        callback();
        this.unindent();
        this.write(end);
    }

    toString() {
        return this.lines.join("\n");
    }
}
